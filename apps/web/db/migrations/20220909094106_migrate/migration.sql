-- CreateTable
CREATE TABLE "custom_fields" (
    "option_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT,
    "label" TEXT,
    "required" BOOLEAN DEFAULT false,
    "enabled" BOOLEAN DEFAULT true,

    CONSTRAINT "custom_fields_pkey" PRIMARY KEY ("option_id")
);

-- CreateTable
CREATE TABLE "user_address" (
    "user_address_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID,
    "wallet_address" TEXT,
    "chain" TEXT,

    CONSTRAINT "user_address_pkey" PRIMARY KEY ("user_address_id")
);

-- CreateTable
CREATE TABLE "user_custom_field" (
    "field_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "option_id" UUID,
    "value" TEXT,
    "user_id" UUID,

    CONSTRAINT "user_custom_field_pkey" PRIMARY KEY ("field_id")
);

-- CreateTable
CREATE TABLE "user_logins" (
    "user_login_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID,
    "browser" TEXT,
    "ip" TEXT,
    "country" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_logins_pkey" PRIMARY KEY ("user_login_id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT,
    "nonce" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT,
    "kyc_verified" BOOLEAN DEFAULT false,
    "discord_username" TEXT,
    "telegram_username" TEXT,
    "twitter_username" TEXT,
    "is_blocked" BOOLEAN DEFAULT false,
    "last_login" TIMESTAMPTZ(6),
    "kyc_processed_id" TEXT,
    "note" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "settings" (
    "name" TEXT NOT NULL,
    "value" TEXT,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "admins" (
    "wallet_address" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "last_login" TIMESTAMPTZ(6),
    "nonce" TEXT,
    "admin_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("admin_id")
);

-- CreateTable
CREATE TABLE "allowlist" (
    "allowlist_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "address" TEXT,
    "label" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "chain" TEXT,

    CONSTRAINT "allowlist_pkey" PRIMARY KEY ("allowlist_id")
);

-- CreateTable
CREATE TABLE "blocklist" (
    "address" TEXT,
    "note" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "blocklist_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "chain" TEXT,

    CONSTRAINT "blocklist_pkey" PRIMARY KEY ("blocklist_id")
);

-- CreateTable
CREATE TABLE "nft_gating" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "chain" TEXT,
    "contract_address" TEXT,
    "label" TEXT,

    CONSTRAINT "nft_gating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refresh_token" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID,

    CONSTRAINT "refresh_token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "token_gating" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "contract_address" TEXT,
    "chain" TEXT,
    "value" DECIMAL,

    CONSTRAINT "token_gating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "custom_fields_name_key" ON "custom_fields"("name");

-- CreateIndex
CREATE UNIQUE INDEX "unique_wallet_address" ON "user_address"("wallet_address");

-- CreateIndex
CREATE INDEX "idx_user_address" ON "user_address"("wallet_address");

-- CreateIndex
CREATE INDEX "idx_user_custom_field" ON "user_custom_field"("user_id");

-- CreateIndex
CREATE INDEX "idx_user_logins" ON "user_logins"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "admins_wallet_address_key" ON "admins"("wallet_address");

-- CreateIndex
CREATE INDEX "idx_admins" ON "admins"("wallet_address");

-- CreateIndex
CREATE INDEX "idx_allowlist" ON "allowlist"("address");

-- CreateIndex
CREATE INDEX "idx_blocklist" ON "blocklist"("address");

-- CreateIndex
CREATE INDEX "idx_nft_gating" ON "nft_gating"("contract_address");

-- CreateIndex
CREATE INDEX "idx_token_gating" ON "token_gating"("contract_address");

-- AddForeignKey
ALTER TABLE "user_address" ADD CONSTRAINT "user_address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_custom_field" ADD CONSTRAINT "user_custom_field_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "custom_fields"("option_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_custom_field" ADD CONSTRAINT "user_custom_field_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_logins" ADD CONSTRAINT "user_logins_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
