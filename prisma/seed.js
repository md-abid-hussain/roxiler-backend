const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient()

async function main(){
    const dataSource = process.env.DATA_SOURCE
    const transactionData = await fetch(dataSource)
    const transactionDataJson = await transactionData.json()

    for(let data of transactionDataJson){
        delete data['id']
        await prisma.transaction.create({
            data:data
        })
    }
}

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(()=>{
    prisma.$disconnect()
})