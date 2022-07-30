
DROP TABLE IF EXISTS "public"."admins";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."admins" (
    "wallet_address" text,
    "created_at" timestamptz DEFAULT now(),
    "last_login" timestamptz,
    "nonce" text,
    "admin_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "name" text,
    PRIMARY KEY ("admin_id")
);

DROP TABLE IF EXISTS "public"."allowlist";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."allowlist" (
    "allowlist_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "address" text,
    "label" text,
    "created_at" timestamptz DEFAULT now(),
    PRIMARY KEY ("allowlist_id")
);

DROP TABLE IF EXISTS "public"."blocklist";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."blocklist" (
    "address" text,
    "note" text,
    "created_at" timestamptz DEFAULT now(),
    "blocklist_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    PRIMARY KEY ("blocklist_id")
);

DROP TABLE IF EXISTS "public"."custom_fields";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."custom_fields" (
    "option_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "name" text,
    "label" text,
    "required" bool DEFAULT false,
    "enabled" bool DEFAULT true,
    PRIMARY KEY ("option_id")
);

DROP TABLE IF EXISTS "public"."nft_gating";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."nft_gating" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "chain" text,
    "contract_address" text,
    "label" text,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."refresh_token";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."refresh_token" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" uuid,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."settings";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."settings" (
    "name" text NOT NULL,
    "value" text,
    PRIMARY KEY ("name")
);

DROP TABLE IF EXISTS "public"."token_gating";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."token_gating" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "contract_address" text,
    "chain" text,
    "value" numeric,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."user_address";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."user_address" (
    "user_address_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" uuid,
    "wallet_address" text,
    "chain" text,
    PRIMARY KEY ("user_address_id")
);

DROP TABLE IF EXISTS "public"."user_custom_field";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."user_custom_field" (
    "field_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "option_id" uuid,
    "value" text,
    "user_id" uuid,
    PRIMARY KEY ("field_id")
);

DROP TABLE IF EXISTS "public"."user_logins";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."user_logins" (
    "user_login_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" uuid,
    "browser" text,
    "ip" text,
    "country" text,
    "created_at" timestamptz,
    PRIMARY KEY ("user_login_id")
);

DROP TABLE IF EXISTS "public"."users";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."users" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "name" text,
    "nonce" text,
    "created_at" timestamptz DEFAULT now(),
    "email" text,
    "kyc_verified" bool DEFAULT false,
    "discord_username" text,
    "telegram_username" text,
    "twitter_username" text,
    "is_blocked" bool DEFAULT false,
    "last_login" timestamptz,
    "kyc_processed_id" text,
    "note" text,
    PRIMARY KEY ("id")
);

INSERT INTO "public"."admins" ("wallet_address", "created_at", "last_login", "nonce", "admin_id", "name") VALUES
('0x000000000000000000000000000000000000dEaD', '2022-07-25 14:13:20.445+00', '2022-07-30 04:57:44.59+00', 'kvx7jl04j4', '66cd0309-e9cc-4f9e-9427-58e491692e4c', 'demo'),
('0xf1996154C34e3dc77b26437a102231785e9aD7fE', '2022-07-21 10:05:09+00', '2022-07-28 16:59:00.642+00', '5k91ercwtd2', '8f697ca0-2361-4747-9d57-7c017996aa37', 'jijin');


INSERT INTO "public"."settings" ("name", "value") VALUES
('accept_custom_fields_on_registeration', 'false'),
('access_allowlist_only', 'false'),
('block_chainabuse_address', 'false'),
('blockpass_apikey', ''),
('blockpass_clientid', ''),
('country_blocklist', ',AF'),
('custom_jwt_claim', '{
  "user-id": "[USER_ID]",
  "email": "[USER_EMAIL]"
}'),
('enable_avax', 'false'),
('enable_bnb', 'false'),
('enable_dot', 'false'),
('enable_eth', 'false'),
('enable_flow', 'false'),
('enable_ftm', 'false'),
('enable_glmr', 'false'),
('enable_matic', 'false'),
('enable_movr', 'false'),
('enable_nft_gating', 'false'),
('enable_sol', 'false'),
('enable_token_gating', 'false'),
('log_user_logins', 'false'),
('nft_access_only', 'false'),
('token_gated_access_only', 'false'),
('token_gating_amount_required', ''),
('token_gating_contract_address', '');


ALTER TABLE "public"."user_address" ADD FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");
ALTER TABLE "public"."user_custom_field" ADD FOREIGN KEY ("option_id") REFERENCES "public"."custom_fields"("option_id");
ALTER TABLE "public"."user_custom_field" ADD FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");
ALTER TABLE "public"."user_logins" ADD FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");
