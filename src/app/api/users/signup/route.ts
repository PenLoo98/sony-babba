// 회원가입 마무리 API
// prisma: 연결한 데이터베이스

// import prisma from '@/app/lib/prisma'

// interface RequestBody {
//   name: string;
//   nickname: string;
//   address: string;

// }

// export async function POST(request: Request) {
//   const body: RequestBody = await request.json()

//   const user = await prisma.user.create({
//     data: {
//       name: body.name,
//       nickname: body.nickname,
//       address: body.address,
//     },
//   })

//   const { name, ...result } = user
//   return new Response(JSON.stringify(result))
// }