import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    await prisma.settings.upsert({
        where: { name: 'access_allowlist_only' },
        update: {},
        create: {
            name: 'access_allowlist_only',
            value: 'false',
        },
    })

    await prisma.settings.upsert({
        where: { name: 'nft_access_only' },
        update: {},
        create: {
            name: 'nft_access_only',
            value: 'false',
        },
    })

    await prisma.settings.upsert({
        where: { name: 'token_gated_access_only' },
        update: {},
        create: {
            name: 'token_gated_access_only',
            value: 'false',
        },
    })

    await prisma.settings.upsert({
        where: { name: 'custom_jwt_claim' },
        update: {},
        create: {
            name: 'custom_jwt_claim',
            value: '',
        },
    })

    await prisma.settings.upsert({
        where: { name: 'block_chainabuse_address' },
        update: {},
        create: {
            name: 'block_chainabuse_address',
            value: 'false',
        },
    })

    await prisma.settings.upsert({
        where: { name: 'enable_eth' },
        update: {},
        create: {
            name: 'enable_eth',
            value: 'false',
        },
    })

    await prisma.settings.upsert({
        where: { name: 'enable_bnb' },
        update: {},
        create: {
            name: 'enable_bnb',
            value: 'false',
        },
    })

    await prisma.settings.upsert({
        where: { name: 'enable_matic' },
        update: {},
        create: {
            name: 'enable_matic',
            value: 'false',
        },
    })

    await prisma.settings.upsert({
        where: { name: 'enable_glmr' },
        update: {},
        create: {
            name: 'enable_glmr',
            value: 'false',
        },
    })

    await prisma.settings.upsert({
        where: { name: 'enable_ftm' },
        update: {},
        create: {
            name: 'enable_ftm',
            value: 'false',
        },
    })

    await prisma.settings.upsert({
        where: { name: 'enable_movr' },
        update: {},
        create: {
            name: 'enable_movr',
            value: 'false',
        },
    })

    await prisma.settings.upsert({
        where: { name: 'enable_avax' },
        update: {},
        create: {
            name: 'enable_avax',
            value: 'false',
        },
    })


}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })