'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Radar } from 'react-chartjs-2'
import { Button } from '@/components/ui/button'

const getPlayerProfile = async (name: string) => {
  const res = await fetch(`/api/player?name=${encodeURIComponent(name)}`)
  return await res.json()
}

export default function Home() {
  const [search, setSearch] = useState('')
  const [player, setPlayer] = useState<any>(null)

  const handleSearch = async () => {
    const profile = await getPlayerProfile(search)
    setPlayer(profile)
  }

  const radarData = player && {
    labels: Object.keys(player.attributes),
    datasets: [{
      label: player.name,
      data: Object.values(player.attributes),
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 2
    }]
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">HoopLand Scout</h1>

      <Input
        placeholder="Search player name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button className="mt-2" onClick={handleSearch}>Search</Button>

      {player && (
        <Card className="mt-6">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">
              {player.name} — #{player.jersey} ({player.position})
            </h2>
            <p className="text-sm text-muted mb-4">
              {player.height}, {player.weight}, {player.birthplace}
            </p>
            <Radar data={radarData} />
            <div className="grid grid-cols-3 gap-2 mt-4 text-sm">
              {Object.entries(player.physical).map(([k, v]) => (
                <div key={k}>{k.toUpperCase()}: {v}</div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
