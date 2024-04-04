-- CreateTable
CREATE TABLE "check_ins" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "(attendee_id)" INTEGER NOT NULL,
    CONSTRAINT "check_ins_(attendee_id)_fkey" FOREIGN KEY ("(attendee_id)") REFERENCES "attendees" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "check_ins_(attendee_id)_key" ON "check_ins"("(attendee_id)");
