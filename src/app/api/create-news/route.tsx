export async function POST(req: Request) {
    try {
        const body = await req.json();
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}news`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(body)
        });

        const responseBody = await response.json();

        return Response.json(responseBody, {
            status: response.status
        })
    } catch(err){
        return Response.json({}, {
            status: 500
        })
    }
}