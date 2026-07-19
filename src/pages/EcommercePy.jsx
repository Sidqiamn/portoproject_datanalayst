import topCategory from "../../src/assets/topCategory.png";
import topReviewProduct from "../../src/assets/topReviewProduct.png";
import reviewDistribution from "../../src/assets/reviewDistribution.png";
import topCities from "../../src/assets/topCities.png";
import rfmAnalysis from "../../src/assets/rfmAnalysis.png";
import orderheatmap from "../../src/assets/orderheatmap.png";

const EcommerceAnalytics = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-12 prose prose-slate">
      {/* Header */}
      <header className="text-center mb-7">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          E-Commerce Analytics Dashboard
        </h1>
        <p className="mt-3 text-gray-600">
          Rangkuman visualisasi analisis data penjualan, review pelanggan,
          distribusi rating, segmentasi geografis, dan analisis RFM pelanggan.
        </p>
        <p className="text-gray-700">
          Berikut adalah link pengerjaan di Google Colab:
        </p>

        <a
          href="https://colab.research.google.com/drive/1OofjmrM21a8pex5OUOdIvIII8gNly_AC?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-lg bg-blue-700 text-white font-medium 
             hover:bg-blue-700 hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          📓 Buka Notebook
        </a>
      </header>
      {/* Streamlit Explanation */}
      <div className="bg-blue-50 border-l-4 text-left border-blue-500 p-5 rounded-lg shadow-sm mb-10">
        <h2 className="text-xl font-semibold text-blue-700">
          🧭 Tentang Dashboard Interaktif Ini
        </h2>
        <p className="mt-2 text-gray-700 leading-relaxed">
          Visualisasi yang ditampilkan pada halaman ini berasal dari dashboard
          interaktif yang dibangun menggunakan <strong>Streamlit</strong>. Pada
          aplikasi Streamlit tersebut, pengguna dapat melakukan{" "}
          <strong>filter data </strong> melalui panel navigasi di sisi kiri
          mulai dari memilih jenis visualisasi, rentang tanggal, kategori
          produk, hingga memilih state tertentu. Selain itu, pengguna juga dapat
          filter berdasarkan rentang waktu tertentu.
        </p>
        <p className="mt-2 text-gray-700 leading-relaxed">
          Seluruh grafik yang Anda lihat di bawah merupakan hasil eksplorasi
          data yang telah difilter sesuai preferensi pengguna, sehingga setiap
          visualisasi mampu memberikan{" "}
          <strong>
            insight yang lebih relevan, fleksibel, dan dapat disesuaikan{" "}
          </strong>
          dengan kebutuhan analisis bisnis.
        </p>
      </div>

      {/* Dashboard Visual Highlights */}
      <section className="flex flex-col gap-10 mb-12">
        {/* Top Product Category */}
        <div>
          <h2 className="text-2xl font-semibold">
            📦 Kategori Produk Terlaris
          </h2>
          <p className="text-gray-700">
            Visualisasi ini menunjukkan 10 kategori produk dengan jumlah
            penjualan tertinggi. Kategori <strong>bed_bath_table</strong>{" "}
            menjadi penjualan teratas, diikuti oleh{" "}
            <strong>health_beauty</strong> dan <strong>sports_leisure</strong>.
          </p>
          <div className="mt-4 rounded-xl overflow-hidden shadow-lg">
            <img
              src={topCategory}
              alt="Top Product Categories"
              className="h-[300px] max-w-2xl mx-auto"
            />
          </div>
        </div>

        {/* Most Reviewed Products */}
        <div>
          <h2 className="text-2xl font-semibold">
            ⭐ Produk dengan Review Terbanyak
          </h2>
          <p className="text-gray-700">
            Grafik horizontal ini menampilkan produk dengan total review
            terbanyak. Produk dengan ID{" "}
            <strong>aca2eb7d00ea1a7b8ebd4e68314663af</strong> menjadi yang
            paling sering direview dengan lebih dari 450 review.
          </p>
          <div className="mt-4 rounded-xl overflow-hidden shadow-lg">
            <img
              src={topReviewProduct}
              alt="Most Reviewed Product"
              className="h-[300px] max-w-2xl mx-auto"
            />
          </div>
        </div>

        {/* Review Score Distribution */}
        <div>
          <h2 className="text-2xl font-semibold">
            📊 Distribusi Skor Review untuk 3 Produk Teratas
          </h2>
          <p className="text-gray-700">
            Distribusi skor menunjukkan bahwa ketiga produk teratas memiliki
            proporsi besar di skor <strong>4</strong> dan <strong>5</strong>,
            menandakan kepuasan pelanggan yang tinggi.
          </p>
          <div className="mt-4 rounded-xl overflow-hidden shadow-lg">
            <img
              src={reviewDistribution}
              alt="Review Score Distribution"
              className="w-full max-w-xl mx-auto"
            />
          </div>
        </div>

        {/* Top Cities */}
        <div>
          <h2 className="text-2xl font-semibold">
            🌍 Kota dengan Pesanan Terbanyak
          </h2>
          <p className="text-gray-700">
            <strong>Sao Paulo</strong> mendominasi jumlah pesanan secara
            signifikan, jauh di atas kota besar lainnya seperti Rio de Janeiro
            dan Belo Horizonte.
          </p>
          <div className="mt-4 rounded-xl overflow-hidden shadow-lg">
            <img
              src={topCities}
              alt="Top Cities Orders"
              className="w-full max-w-xl mx-auto"
            />
          </div>
        </div>

        {/* RFM Analysis */}
        <div>
          <h2 className="text-2xl font-semibold">
            👥 Analisis RFM — Pelanggan Terbaik
          </h2>
          <p className="text-gray-700">
            Analisis RFM digunakan untuk mengidentifikasi pelanggan terbaik
            berdasarkan <strong>Recency</strong>, <strong>Frequency</strong>,
            dan <strong>Monetary Value</strong>. Tabel menunjukkan 5 pelanggan
            dengan nilai recency terbaik (paling recent melakukan pembelian).
          </p>
          <div className="mt-4 rounded-xl overflow-hidden shadow-lg">
            <img
              src={rfmAnalysis}
              alt="RFM Analysis"
              className="w-full max-w-xl mx-auto"
            />
          </div>
        </div>
        {/* Geographical Heatmap */}
        <div>
          <h2 className="text-2xl font-semibold">
            🗺️ Peta Sebaran Pesanan (Geographical Heatmap)
          </h2>
          <p className="text-gray-700">
            Visualisasi heatmap ini menunjukkan konsentrasi pesanan berdasarkan
            lokasi pelanggan. Warna merah–kuning menandakan kepadatan pesanan
            yang tinggi, yang paling dominan terlihat di wilayah tenggara Brasil
            seperti <strong>Sao Paulo</strong>, <strong>Rio de Janeiro</strong>,
            dan <strong>Belo Horizonte</strong>. Sementara area hijau–biru
            menunjukkan wilayah dengan volume pesanan yang lebih rendah.
          </p>
          <div className="mt-4 rounded-xl overflow-hidden shadow-lg">
            <img
              src={orderheatmap}
              alt="Geographical Heatmap of Orders"
              className="w-full max-w-xl mx-auto"
            />
          </div>
        </div>
      </section>

      <hr className="my-10" />

      {/* Key Insights */}
      <section className="space-y-6 mb-12">
        <h2 className="text-2xl font-semibold">🔎 Key Insights</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Insight 1 */}
          <article className="bg-white p-5 rounded-xl shadow-sm">
            <h4 className="font-bold">Kategori Produk Terlaris</h4>
            <p className="text-sm text-gray-600">
              Kategori <strong>bed_bath_table</strong> secara konsisten menjadi
              penyumbang penjualan terbesar. Fokus penambahan stok dan promo
              pada kategori ini berpotensi meningkatkan pendapatan.
            </p>
          </article>

          <article className="bg-white p-5 rounded-xl shadow-sm">
            <h4 className="font-bold">Skor Review Pelanggan Sangat Positif</h4>
            <p className="text-sm text-gray-600">
              Skor review menunjukkan dominasi rating 4–5, menandakan kualitas
              produk yang baik dan pengalaman pelanggan yang positif.
            </p>
          </article>

          <article className="bg-white p-5 rounded-xl shadow-sm">
            <h4 className="font-bold">Distribusi Pesanan Secara Geografis</h4>
            <p className="text-sm text-gray-600">
              Konsentrasi pesanan sangat tinggi di kota besar, terutama
              <strong>Sao Paulo</strong>, yang menggambarkan pasar potensial
              paling besar untuk ekspansi logistik.
            </p>
          </article>
        </div>
      </section>

      {/* Detailed Interpretation */}
      <section className="space-y-6 mb-16">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 border-b border-gray-200 pb-3">
          📌 Interpretasi Mendalam
        </h2>

        <div className="bg-white p-8 rounded-2xl shadow-md space-y-8">
          {/* Item 1 */}
          <div className="flex items-start  text-left gap-4">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                Pola Penjualan Produk
              </h3>
              <p className="mt-1 text-left text-gray-600 leading-relaxed">
                Produk kebutuhan rumah tangga mendominasi penjualan, yang
                menunjukkan permintaan tinggi pada kategori esensial. Kategori
                dengan performa rendah dapat dievaluasi untuk perbaikan kualitas
                maupun strategi pemasaran baru.
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-start text-left gap-4">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                Analisis Review Pelanggan
              </h3>
              <p className="mt-1 text-left text-gray-600 leading-relaxed">
                Tingginya jumlah review pada beberapa produk menunjukkan
                keterlibatan pelanggan yang kuat. Distribusi rating yang
                didominasi nilai positif turut meningkatkan kredibilitas dan
                kepercayaan terhadap produk.
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex items-start text-left gap-4">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                Preferensi Wilayah
              </h3>
              <p className="mt-1 text-left text-gray-600 leading-relaxed">
                Mayoritas transaksi terkonsentrasi di kota-kota besar. Pola ini
                membuka peluang untuk optimasi biaya logistik, penguatan
                strategi pemasaran digital, serta perencanaan distribusi yang
                lebih efisien.
              </p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="flex items-start  text-left gap-4">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
              4
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                RFM Customer Segmentation
              </h3>
              <p className="mt-1 text-left text-gray-600 leading-relaxed">
                Pelanggan dengan nilai recency terbaik cenderung memiliki
                monetary value yang tinggi. Hal ini menunjukkan potensi besar
                untuk program loyalitas dan kampanye retensi yang lebih
                personal.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="text-center text-sm text-gray-600"></footer>
    </div>
  );
};

export default EcommerceAnalytics;
