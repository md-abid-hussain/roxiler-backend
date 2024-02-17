const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient()

async function main(){
    const dataSource = process.env.DATA_SOURCE
    const salesDataResponse = await fetch(dataSource)
    const salesDataJson = await salesDataResponse.json()

    for(let data of salesDataJson){
        delete data['id']
        await prisma.salesData.create({
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