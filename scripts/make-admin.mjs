import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const email = 'thete9ni@gmail.com';

async function main() {
    try {
        console.log(`Looking for user: ${email}...`);
        const user = await prisma.profile.findFirst({
            where: { email: email }
        });

        if (!user) {
            console.error(`User with email ${email} not found!`);
            console.log("Please make sure you have signed up at /register first.");
            process.exit(1);
        }

        console.log(`Found user: ${user.fullName || user.email} (ID: ${user.id})`);
        console.log(`Current Role: ${user.role}`);

        const updated = await prisma.profile.update({
            where: { id: user.id },
            data: { role: 'ADMIN' }
        });

        console.log(`SUCCESS: User ${updated.email} is now an ${updated.role}!`);
    } catch (error) {
        console.error("Error updating user:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
