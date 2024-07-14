import {
  ChartData,
  Chart as ChartJS,
  ChartOptions,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from 'chart.js'
import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Radar } from 'react-chartjs-2'
import { auth, db } from '../firebase-config'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
)

interface HistoricalDataProps {
  onBack: () => void
}

interface IconCounts {
  Sweet: number
  Hot: number
  Sour: number
  Salty: number
  Cat: number
}

const HistoricalData: React.FC<HistoricalDataProps> = ({ onBack }) => {
  const [iconCounts, setIconCounts] = useState<IconCounts>({
    Sweet: 0,
    Hot: 0,
    Sour: 0,
    Salty: 0,
    Cat: 0,
  })

  useEffect(() => {
    const fetchIconData = async () => {
      const user = auth.currentUser
      if (user) {
        const iconsRef = collection(db, 'users', user.uid, 'details')
        try {
          const snapshot = await getDocs(iconsRef)
          const counts: IconCounts = {
            Sweet: 0,
            Hot: 0,
            Sour: 0,
            Salty: 0,
            Cat: 0,
          }
          snapshot.forEach((doc) => {
            const data = doc.data()
            const icon = data.selectedIcon as keyof IconCounts
            counts[icon] += 1
          })
          setIconCounts(counts)
        } catch (error) {
          console.error('Error fetching icon data: ', error)
          alert('データの取得に失敗しました。権限を確認してください。')
        }
      } else {
        console.error('No user is logged in')
        alert('ユーザーがログインしていません。')
      }
    }

    fetchIconData()
  }, [])

  const data: ChartData<'radar'> = {
    labels: ['Sweet', 'Hot', 'Sour', 'Salty', 'Cat'],
    datasets: [
      {
        label: 'Icon Counts',
        data: [
          iconCounts.Sweet,
          iconCounts.Hot,
          iconCounts.Sour,
          iconCounts.Salty,
          iconCounts.Cat,
        ],
        backgroundColor: 'rgba(255, 159, 243, 0.2)',
        borderColor: 'rgba(255, 159, 243, 1)',
        borderWidth: 2,
      },
    ],
  }

  const options: ChartOptions<'radar'> = {
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: Math.max(...Object.values(iconCounts)) + 1,
        ticks: {
          display: false, // 数字を非表示にする
        },
        pointLabels: {
          font: {
            family: "'Hachi Maru Pop', sans-serif", // プロジェクトで使用しているフォントに変更
            size: 14,
            weight: 'bold',
          },
          color: '#FF9FF3', // かわいい色に設定
        },
      },
    },
    plugins: {
      legend: {
        display: false, // ラベルを非表示にする
      },
      tooltip: {
        enabled: true,
      },
    },
  }

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-pink-100">
      <div className="w-full sm:w-2/3 lg:w-1/3">
        <Radar data={data} options={options} />
      </div>
      <button
        onClick={onBack}
        className="bg-pink-300 text-white rounded px-4 py-2 mt-4"
      >
        戻る
      </button>
    </div>
  )
}

export default HistoricalData
