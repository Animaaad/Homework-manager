CREATE TABLE "public"."users" (
    "id" varchar(100) NOT NULL,
    
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."homeworks" (
    "id" varchar(100) NOT NULL,
    "user_id" varchar(100) NOT NULL,
    "title" text NOT NULL,
     
    PRIMARY KEY ("id")
);

INSERT INTO "public"."homeworks"(id, user_id, text) VALUES ('1', 'b', 'grr');

SELECT * FROM homeworks

COMMIT;
