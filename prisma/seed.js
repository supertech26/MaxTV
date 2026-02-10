const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const plans = [
        {
            name: '1 Month Pass',
            description: 'Full access for 30 days',
            price: 14.99,
            durationMonths: 1,
            features: ['4K/8K Quality', 'Anti-Freeze Technology', '24/7 Support', 'All Devices Supported'],
            isActive: true,
        },
        {
            name: '6 Months Saver',
            description: 'Half-year access with discount',
            price: 49.99,
            durationMonths: 6,
            features: ['4K/8K Quality', 'Anti-Freeze Technology', '24/7 Support', 'All Devices Supported', 'Save 45%'],
            isActive: true,
        },
        {
            name: '12 Months Premium',
            description: 'Best value for year-round entertainment',
            price: 79.99,
            durationMonths: 12,
            features: ['4K/8K Quality', 'Anti-Freeze Technology', '24/7 Priority Support', 'All Devices Supported', '2 Connections', 'Save 60%'],
            isActive: true,
        },
    ]

    console.log('Start seeding plans...')

    for (const plan of plans) {
        const existingPlan = await prisma.plan.findFirst({
            where: { name: plan.name }
        })

        if (!existingPlan) {
            const createdPlan = await prisma.plan.create({
                data: plan,
            })
            console.log(`Created plan with id: ${createdPlan.id}`)
        } else {
            console.log(`Plan "${plan.name}" already exists. Skipping.`)
        }
    }

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
