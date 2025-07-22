import { PrismaClient, DrinkType, Tier } from '@prisma/client'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { createId } from '@paralleldrive/cuid2'

dotenv.config()


const prisma = new PrismaClient()

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY


// Debug: Print environment variables (first few chars only for security)
console.log('🔧 Environment check:')
console.log('  - SUPABASE_URL (first 8 chars):', supabaseUrl?.slice(0, 8) + '...')
console.log('  - SERVICE_ROLE_KEY (first 8 chars):', supabaseServiceKey?.slice(0, 8) + '...')

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables')
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in backend/.env')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function main() {
  console.log('🌱 Starting database seed...')

  // Test Supabase connection and permissions first
  console.log('🔧 Testing Supabase connection...')
  const { data: testData, error: testError } = await supabase
    .from('Org')
    .select('*')
    .limit(1)
  
  if (testError) {
    console.error('❌ Supabase connection test failed:', testError)
    console.error('This indicates a problem with your service role key or permissions.')
    process.exit(1)
  } else {
    console.log('✅ Supabase connection successful!')
  }

  // Clear existing data (still uses Prisma; consider migrating this to Supabase if needed)
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

  // --- SEED DATA USING SUPABASE API ---

  // 1. Create a sample organization
  const now = new Date().toISOString()
  const { data: orgs, error: orgError } = await supabase
    .from('Org')
    .insert([{ 
      id: createId(),
      name: 'Sample Restaurant',
      createdAt: now
    }])
    .select()

  if (orgError || !orgs || orgs.length === 0) {
    console.error('❌ Error creating organization:', orgError)
    process.exit(1)
  }
  const org = orgs[0]
  console.log('✅ Created organization:', org.name)

  // 2. Create sample liquors
  const liquorData = [
    {
      id: createId(),
      name: 'Tequila Blanco',
      type: 'Tequila',
      description: 'A clear, unaged tequila with a crisp, clean flavor profile.',
      imageUrl: null,
      createdAt: now,
      updatedAt: now,
      orgId: org.id
    },
    {
      id: createId(),
      name: 'Gin',
      type: 'Gin',
      description: 'A juniper-flavored spirit with botanical notes.',
      imageUrl: null,
      createdAt: now,
      updatedAt: now,
      orgId: org.id
    },
    {
      id: createId(),
      name: 'Vodka',
      type: 'Vodka',
      description: 'A neutral spirit with a clean, smooth taste.',
      imageUrl: null,
      createdAt: now,
      updatedAt: now,
      orgId: org.id
    }
  ]
  const { data: liquors, error: liquorError } = await supabase
    .from('Liquor')
    .insert(liquorData)
    .select()
  if (liquorError) {
    console.error('❌ Error creating liquors:', liquorError)
    process.exit(1)
  }

  // 3. Create sample cocktails (with ingredients as a JSON array for now)
  const cocktailData = [
    {
      id: createId(),
      name: 'Classic Margarita',
      type: 'COCKTAIL',
      baseLiquor: 'Tequila',
      tier: 'MEDIUM',
      description: 'A refreshing and tangy classic cocktail perfect for any occasion.',
      recipe: '1. Fill a cocktail shaker with ice\n2. Add tequila, lime juice, and triple sec\n3. Shake vigorously for 10-15 seconds\n4. Strain into a salt-rimmed glass\n5. Garnish with lime wedge',
      imageUrl: null,
      createdAt: now,
      updatedAt: now,
      orgId: org.id
    },
    {
      id: createId(),
      name: 'Negroni',
      type: 'COCKTAIL',
      baseLiquor: 'Gin',
      tier: 'HIGH',
      description: 'A sophisticated Italian aperitif with a perfect balance of bitter and sweet.',
      recipe: '1. Fill a rocks glass with ice\n2. Add gin, Campari, and vermouth\n3. Stir gently for 20-30 seconds\n4. Garnish with orange peel',
      imageUrl: null,
      createdAt: now,
      updatedAt: now,
      orgId: org.id
    },
    {
      id: createId(),
      name: 'Moscow Mule',
      type: 'COCKTAIL',
      baseLiquor: 'Vodka',
      tier: 'LOW',
      description: 'A refreshing and spicy cocktail served in a signature copper mug.',
      recipe: '1. Fill a copper mug with ice\n2. Add vodka and lime juice\n3. Top with ginger beer\n4. Stir gently\n5. Garnish with lime wedge',
      imageUrl: null,
      createdAt: now,
      updatedAt: now,
      orgId: org.id
    }
  ]
  const { data: cocktails, error: cocktailError } = await supabase
    .from('Cocktail')
    .insert(cocktailData)
    .select()
  if (cocktailError) {
    console.error('❌ Error creating cocktails:', cocktailError)
    process.exit(1)
  }

  // 4. Create sample wines
  const wineData = [
    {
      id: createId(),
      name: 'Château Margaux 2015',
      type: 'WINE',
      grapeVariety: 'Cabernet Sauvignon',
      tier: 'HIGH',
      description: 'A legendary Bordeaux with exceptional complexity and aging potential.',
      imageUrl: null,
      createdAt: now,
      updatedAt: now,
      orgId: org.id
    },
    {
      id: createId(),
      name: 'Dom Pérignon 2012',
      type: 'WINE',
      grapeVariety: 'Chardonnay',
      tier: 'HIGH',
      description: 'A prestigious champagne with fine bubbles and elegant complexity.',
      imageUrl: null,
      createdAt: now,
      updatedAt: now,
      orgId: org.id
    },
    {
      id: createId(),
      name: 'Kim Crawford Sauvignon Blanc',
      type: 'WINE',
      grapeVariety: 'Sauvignon Blanc',
      tier: 'MEDIUM',
      description: 'A crisp and refreshing New Zealand white wine with citrus notes.',
      imageUrl: null,
      createdAt: now,
      updatedAt: now,
      orgId: org.id
    }
  ]
  const { data: wines, error: wineError } = await supabase
    .from('Wine')
    .insert(wineData)
    .select()
  if (wineError) {
    console.error('❌ Error creating wines:', wineError)
    process.exit(1)
  }

  // 5. Create training modules and lessons
  const moduleData = [
    {
      id: createId(),
      title: 'Cocktail Basics',
      orgId: org.id
    },
    {
      id: createId(),
      title: 'Wine Knowledge',
      orgId: org.id
    }
  ]
  const { data: modules, error: moduleError } = await supabase
    .from('Module')
    .insert(moduleData)
    .select()
  if (moduleError) {
    console.error('❌ Error creating modules:', moduleError)
    process.exit(1)
  }

  // Lessons for each module
  const lessonsData = [
    // For Cocktail Basics
    {
      id: createId(),
      title: 'Introduction to Cocktails',
      content: 'Learn the fundamentals of cocktail making, including essential tools and techniques.',
      mediaUrl: null,
      moduleId: modules[0].id,
      orgId: org.id
    },
    {
      id: createId(),
      title: 'Classic Cocktails',
      content: 'Master the most popular classic cocktails that every bartender should know.',
      mediaUrl: null,
      moduleId: modules[0].id,
      orgId: org.id
    },
    // For Wine Knowledge
    {
      id: createId(),
      title: 'Wine Fundamentals',
      content: 'Understanding wine varieties, regions, and tasting techniques.',
      mediaUrl: null,
      moduleId: modules[1].id,
      orgId: org.id
    },
    {
      id: createId(),
      title: 'Wine Service',
      content: 'Proper wine service techniques including opening, decanting, and temperature control.',
      mediaUrl: null,
      moduleId: modules[1].id,
      orgId: org.id
    }
  ]
  const { data: lessons, error: lessonError } = await supabase
    .from('Lesson')
    .insert(lessonsData)
    .select()
  if (lessonError) {
    console.error('❌ Error creating lessons:', lessonError)
    process.exit(1)
  }

  // 6. Create Supabase Auth users and User table records
  const users = await Promise.all([
    // Create admin user
    (async () => {
      const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
        email: 'admin@restaurant.com',
        password: 'admin123',
        email_confirm: true,
        user_metadata: { name: 'Admin User' }
      })
      if (authError || !authUser?.user) {
        console.error('❌ Error creating admin user:', authError)
        return null
      }
      // Insert into User table
      const { data: adminUser, error: userInsertError } = await supabase
        .from('User')
        .insert([
          {
            id: createId(),
            email: 'admin@restaurant.com',
            role: 'ADMIN',
            name: 'Admin User',
            supabaseId: authUser.user.id,
            orgId: org.id,
            createdAt: now,
            updatedAt: now
          }
        ])
        .select()
        .single()
      if (userInsertError) {
        console.error('❌ Error inserting admin user into User table:', userInsertError)
        return null
      }
      return adminUser
    })(),
    // Create staff user
    (async () => {
      const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
        email: 'bartender@restaurant.com',
        password: 'staff123',
        email_confirm: true,
        user_metadata: { name: 'Bartender' }
      })
      if (authError || !authUser?.user) {
        console.error('❌ Error creating staff user:', authError)
        return null
      }
      // Insert into User table
      const { data: staffUser, error: userInsertError } = await supabase
        .from('User')
        .insert([
          {
            id: createId(),
            email: 'bartender@restaurant.com',
            role: 'STAFF',
            name: 'Bartender',
            supabaseId: authUser.user.id,
            orgId: org.id,
            createdAt: now,
            updatedAt: now
          }
        ])
        .select()
        .single()
      if (userInsertError) {
        console.error('❌ Error inserting staff user into User table:', userInsertError)
        return null
      }
      return staffUser
    })()
  ])

  console.log(`✅ Created ${liquors.length} liquors`)
  console.log(`✅ Created ${cocktails.length} cocktails`)
  console.log(`✅ Created ${wines.length} wines`)
  console.log(`✅ Created ${modules.length} modules`)
  console.log(`✅ Created ${lessons.length} lessons`)
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