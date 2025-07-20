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
  await prisma.quizResult.deleteMany()
  await prisma.quizOption.deleteMany()
  await prisma.quizQuestion.deleteMany()
  await prisma.quiz.deleteMany()
  await prisma.employeeProgress.deleteMany()
  await prisma.lesson.deleteMany()
  await prisma.module.deleteMany()
  await prisma.cocktailIngredient.deleteMany()
  await prisma.cocktail.deleteMany()
  await prisma.liquor.deleteMany()
  await prisma.wine.deleteMany()
  await prisma.user.deleteMany()
  await prisma.org.deleteMany()

  // Create a sample organization
  const org = await prisma.org.create({
    data: {
      name: 'Sample Restaurant'
    }
  })

  console.log('✅ Created organization:', org.name)

  // Create sample liquors
  const liquors = await Promise.all([
    prisma.liquor.create({
      data: {
        name: 'Tequila Blanco',
        type: 'Tequila',
        description: 'A clear, unaged tequila with a crisp, clean flavor profile.',
        imageUrl: null,
        orgId: org.id
      }
    }),
    prisma.liquor.create({
      data: {
        name: 'Gin',
        type: 'Gin',
        description: 'A juniper-flavored spirit with botanical notes.',
        imageUrl: null,
        orgId: org.id
      }
    }),
    prisma.liquor.create({
      data: {
        name: 'Vodka',
        type: 'Vodka',
        description: 'A neutral spirit with a clean, smooth taste.',
        imageUrl: null,
        orgId: org.id
      }
    })
  ])

  // Create sample cocktails
  const cocktails = await Promise.all([
    prisma.cocktail.create({
      data: {
        name: 'Classic Margarita',
        type: DrinkType.COCKTAIL,
        baseLiquor: 'Tequila',
        tier: Tier.MEDIUM,
        description: 'A refreshing and tangy classic cocktail perfect for any occasion.',
        recipe: '1. Fill a cocktail shaker with ice\n2. Add tequila, lime juice, and triple sec\n3. Shake vigorously for 10-15 seconds\n4. Strain into a salt-rimmed glass\n5. Garnish with lime wedge',
        imageUrl: null,
        orgId: org.id,
        ingredients: {
          create: [
            { name: '2 oz Tequila Blanco' },
            { name: '1 oz Fresh Lime Juice' },
            { name: '0.75 oz Triple Sec' },
            { name: 'Lime wedge for garnish' }
          ]
        }
      }
    }),
    prisma.cocktail.create({
      data: {
        name: 'Negroni',
        type: DrinkType.COCKTAIL,
        baseLiquor: 'Gin',
        tier: Tier.HIGH,
        description: 'A sophisticated Italian aperitif with a perfect balance of bitter and sweet.',
        recipe: '1. Fill a rocks glass with ice\n2. Add gin, Campari, and vermouth\n3. Stir gently for 20-30 seconds\n4. Garnish with orange peel',
        imageUrl: null,
        orgId: org.id,
        ingredients: {
          create: [
            { name: '1 oz Gin' },
            { name: '1 oz Campari' },
            { name: '1 oz Sweet Vermouth' },
            { name: 'Orange peel for garnish' }
          ]
        }
      }
    }),
    prisma.cocktail.create({
      data: {
        name: 'Moscow Mule',
        type: DrinkType.COCKTAIL,
        baseLiquor: 'Vodka',
        tier: Tier.LOW,
        description: 'A refreshing and spicy cocktail served in a signature copper mug.',
        recipe: '1. Fill a copper mug with ice\n2. Add vodka and lime juice\n3. Top with ginger beer\n4. Stir gently\n5. Garnish with lime wedge',
        imageUrl: null,
        orgId: org.id,
        ingredients: {
          create: [
            { name: '2 oz Vodka' },
            { name: '0.5 oz Fresh Lime Juice' },
            { name: '4 oz Ginger Beer' },
            { name: 'Lime wedge for garnish' }
          ]
        }
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
        description: 'A legendary Bordeaux with exceptional complexity and aging potential.',
        imageUrl: null,
        orgId: org.id
      }
    }),
    prisma.wine.create({
      data: {
        name: 'Dom Pérignon 2012',
        type: DrinkType.WINE,
        grapeVariety: 'Chardonnay',
        tier: Tier.HIGH,
        description: 'A prestigious champagne with fine bubbles and elegant complexity.',
        imageUrl: null,
        orgId: org.id
      }
    }),
    prisma.wine.create({
      data: {
        name: 'Kim Crawford Sauvignon Blanc',
        type: DrinkType.WINE,
        grapeVariety: 'Sauvignon Blanc',
        tier: Tier.MEDIUM,
        description: 'A crisp and refreshing New Zealand white wine with citrus notes.',
        imageUrl: null,
        orgId: org.id
      }
    })
  ])

  // Create training modules and lessons
  const module1 = await prisma.module.create({
    data: {
      title: 'Cocktail Basics',
      orgId: org.id,
      lessons: {
        create: [
          {
            title: 'Introduction to Cocktails',
            content: 'Learn the fundamentals of cocktail making, including essential tools and techniques.',
            mediaUrl: null,
            orgId: org.id
          },
          {
            title: 'Classic Cocktails',
            content: 'Master the most popular classic cocktails that every bartender should know.',
            mediaUrl: null,
            orgId: org.id
          }
        ]
      }
    }
  })

  const module2 = await prisma.module.create({
    data: {
      title: 'Wine Knowledge',
      orgId: org.id,
      lessons: {
        create: [
          {
            title: 'Wine Fundamentals',
            content: 'Understanding wine varieties, regions, and tasting techniques.',
            mediaUrl: null,
            orgId: org.id
          },
          {
            title: 'Wine Service',
            content: 'Proper wine service techniques including opening, decanting, and temperature control.',
            mediaUrl: null,
            orgId: org.id
          }
        ]
      }
    }
  })

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
          supabaseId: authUser.user.id,
          orgId: org.id
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
          supabaseId: authUser.user.id,
          orgId: org.id
        }
      })
    })()
  ])

  console.log(`✅ Created ${liquors.length} liquors`)
  console.log(`✅ Created ${cocktails.length} cocktails`)
  console.log(`✅ Created ${wines.length} wines`)
  console.log(`✅ Created 2 training modules with lessons`)
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