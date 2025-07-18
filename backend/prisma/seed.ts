import { PrismaClient, DrinkType, Tier } from '@prisma/client'
import { createClient } from '@supabase/supabase-js'

const prisma = new PrismaClient()

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables')
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in backend/.env')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data
  await prisma.wine.deleteMany()
  await prisma.cocktail.deleteMany()
  await prisma.user.deleteMany()

  // Create sample cocktails
  const cocktails = await Promise.all([
    prisma.cocktail.create({
      data: {
        name: 'Classic Margarita',
        type: DrinkType.COCKTAIL,
        baseLiquor: 'Tequila',
        tier: Tier.MEDIUM,
        ingredients: ['2 oz Tequila Blanco', '1 oz Fresh Lime Juice', '0.75 oz Triple Sec', 'Lime wedge for garnish'],
        description: 'A refreshing and tangy classic cocktail perfect for any occasion.',
        recipe: '1. Fill a cocktail shaker with ice\n2. Add tequila, lime juice, and triple sec\n3. Shake vigorously for 10-15 seconds\n4. Strain into a salt-rimmed glass\n5. Garnish with lime wedge',
        imageUrl: null
      }
    }),
    prisma.cocktail.create({
      data: {
        name: 'Negroni',
        type: DrinkType.COCKTAIL,
        baseLiquor: 'Gin',
        tier: Tier.HIGH,
        ingredients: ['1 oz Gin', '1 oz Campari', '1 oz Sweet Vermouth', 'Orange peel for garnish'],
        description: 'A sophisticated Italian aperitif with a perfect balance of bitter and sweet.',
        recipe: '1. Fill a rocks glass with ice\n2. Add gin, Campari, and vermouth\n3. Stir gently for 20-30 seconds\n4. Garnish with orange peel',
        imageUrl: null
      }
    }),
    prisma.cocktail.create({
      data: {
        name: 'Moscow Mule',
        type: DrinkType.COCKTAIL,
        baseLiquor: 'Vodka',
        tier: Tier.LOW,
        ingredients: ['2 oz Vodka', '0.5 oz Fresh Lime Juice', '4 oz Ginger Beer', 'Lime wedge for garnish'],
        description: 'A refreshing and spicy cocktail served in a signature copper mug.',
        recipe: '1. Fill a copper mug with ice\n2. Add vodka and lime juice\n3. Top with ginger beer\n4. Stir gently\n5. Garnish with lime wedge',
        imageUrl: null
      }
    })
  ])

  // Create sample wines
  const wines = await Promise.all([
    prisma.wine.create({
      data: {
        name: 'Château Margaux 2015',
        type: DrinkType.WINE,
        grapeVariety: 'Cabernet Sauvignon',
        tier: Tier.HIGH,
        ingredients: ['Cabernet Sauvignon', 'Merlot', 'Cabernet Franc', 'Petit Verdot'],
        description: 'A legendary Bordeaux with exceptional complexity and aging potential.',
        recipe: 'Decant for 2-3 hours before serving. Best served at 60-65°F (16-18°C).',
        imageUrl: null
      }
    }),
    prisma.wine.create({
      data: {
        name: 'Dom Pérignon 2012',
        type: DrinkType.WINE,
        grapeVariety: 'Chardonnay',
        tier: Tier.HIGH,
        ingredients: ['Chardonnay', 'Pinot Noir'],
        description: 'A prestigious champagne with fine bubbles and elegant complexity.',
        recipe: 'Serve chilled at 45-50°F (7-10°C). Perfect for celebrations and special occasions.',
        imageUrl: null
      }
    }),
    prisma.wine.create({
      data: {
        name: 'Kim Crawford Sauvignon Blanc',
        type: DrinkType.WINE,
        grapeVariety: 'Sauvignon Blanc',
        tier: Tier.MEDIUM,
        ingredients: ['Sauvignon Blanc'],
        description: 'A crisp and refreshing New Zealand white wine with citrus notes.',
        recipe: 'Serve chilled at 45-50°F (7-10°C). Pairs well with seafood and light dishes.',
        imageUrl: null
      }
    })
  ])

  // Create Supabase Auth users and database records
  const users = await Promise.all([
    // Create admin user
    (async () => {
      const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
        email: 'admin@restaurant.com',
        password: 'admin123',
        email_confirm: true,
        user_metadata: { name: 'Admin User' }
      })

      if (authError) {
        console.error('❌ Error creating admin user:', authError)
        return null
      }

      return prisma.user.create({
        data: {
          email: 'admin@restaurant.com',
          role: 'ADMIN',
          name: 'Admin User',
          supabaseId: authUser.user.id
        }
      })
    })(),

    // Create staff user
    (async () => {
      const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
        email: 'bartender@restaurant.com',
        password: 'staff123',
        email_confirm: true,
        user_metadata: { name: 'Bartender' }
      })

      if (authError) {
        console.error('❌ Error creating staff user:', authError)
        return null
      }

      return prisma.user.create({
        data: {
          email: 'bartender@restaurant.com',
          role: 'STAFF',
          name: 'Bartender',
          supabaseId: authUser.user.id
        }
      })
    })()
  ])

  console.log(`✅ Created ${cocktails.length} cocktails`)
  console.log(`✅ Created ${wines.length} wines`)
  console.log(`✅ Created ${users.filter(Boolean).length} users`)
  console.log('🎉 Database seeding completed!')
  console.log('\n📋 Login Credentials:')
  console.log('Admin: admin@restaurant.com / admin123')
  console.log('Staff: bartender@restaurant.com / staff123')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 