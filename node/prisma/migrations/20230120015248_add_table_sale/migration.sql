-- CreateTable
CREATE TABLE "Sale" (
    "id" SERIAL NOT NULL,
    "productList" TEXT[],
    "paymentList" TEXT[],
    "value" DOUBLE PRECISION NOT NULL,
    "dateRegister" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);
