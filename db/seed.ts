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
        where: { name: 'enable_nft_gating' },
        update: {},
        create: {
            name: 'enable_nft_gating',
            value: 'false',
        },
    })

    await prisma.settings.upsert({
        where: { name: 'enable_token_gating' },
        update: {},
        create: {
            name: 'enable_token_gating',
            value: 'false',
        },
    })


    await prisma.settings.upsert({
        where: { name: 'accept_custom_fields_on_registeration' },
        update: {},
        create: {
            name: 'accept_custom_fields_on_registeration',
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
        where: { name: 'log_user_logins' },
        update: {},
        create: {
            name: 'log_user_logins',
            value: 'false',
        },
    })

    await prisma.settings.upsert({
        where: { name: 'country_blocklist' },
        update: {},
        create: {
            name: 'country_blocklist',
            value: '',
        },
    })


    await prisma.settings.upsert({
        where: { name: 'blockpass_clientid' },
        update: {},
        create: {
            name: 'blockpass_clientid',
            value: '',
        },
    })

    await prisma.settings.upsert({
        where: { name: 'blockpass_apikey' },
        update: {},
        create: {
            name: 'blockpass_apikey',
            value: '',
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
        where: { name: 'enable_movr' },
        update: {},
        create: {
            name: 'enable_movr',
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

    await prisma.settings.upsert({
        where: { name: 'enable_sol' },
        update: {},
        create: {
            name: 'enable_sol',
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
