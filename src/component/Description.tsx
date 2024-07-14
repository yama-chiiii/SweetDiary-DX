import React from 'react'
import mihonImg from "../image/mihon.png";
import kirokuImg from "../image/kiroku.png";
import kekkaImg from "../image/kekka.png";
import yajirusiImg from "../image/yajirusi.png";
type DescriptionProps = {
  onClose: () => void
}

const Description: React.FC<DescriptionProps> = ({ onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-red-800 bg-opacity-50 z-50">
    <div className="bg-white p-8 shadow-lg max-w-3xl mx-auto max-h-screen overflow-y-auto rounded-lg">
      <h2 className="text-4xl font-black mb-4 text-pink-500 text-center">
        おかしにっきとは？
      </h2>
      <div className='flex justify-center'>
      <img src={mihonImg} alt="mihon" className='w-50% h-80 rounded-lg'/>
      <img src={yajirusiImg} alt="yajirusi" className='w-16 h-10 ml-3 mt-36'/>
      <img src={kirokuImg} alt='kiroku' className='w-50% h-80 ml-2 rounded-lg'/>
      <img src={yajirusiImg} alt="yajirusi" className='w-16 h-10 ml-3 mt-36'/>
      <img src={kekkaImg} alt='kekka' className='w-50% h-80 ml-2 rounded-lg'/>
      </div>
      <p className="text-gray-700">
        おかしにっきは、お菓子の価格やカロリー、味の感想を記録するための日記帳アプリです。<br></br>日付の上にあるピンクのアイコンを押すと、その日に食べたお菓子の情報を入力できます。また、目標部分から月の目標も設定可能です。<br></br>毎日記入して君だけのお菓子日記を作り上げよう！
      </p>
      <div className='flex jusitfy-center'>
      <button
        className="mt-4 px-4 py-2 bg-pink-100 text-white rounded-lg hover:bg-pink-200 mx-auto"
        onClick={onClose}
      >
        閉じる
      </button>
      </div>
    </div>
  </div>
)

export default Description
