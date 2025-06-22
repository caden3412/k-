import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const name = searchParams.get('name') || 'Jayden Johnson'

  return NextResponse.json({
    name,
    position: 'SG',
    height: "6'5\"",
    weight: '190 lbs',
    birthplace: 'Atlanta, GA',
    jersey: 23,
    attributes: {
      layup: 7, dunking: 8, inside: 6, midrange: 7,
      three: 9, freeThrow: 8, dribbling: 7, passing: 6,
      offReb: 4, defReb: 5, stealing: 6, blocking: 3
    },
    physical: { speed: 9, strength: 6, stamina: 8 }
  })
}