<template>
  <div class="modalOnboarding">
    <b-row class="justify-content-center">
      <img
        src="@/assets/images/svg/imgstep4.svg"
        alt="imgstep2"
      >
    </b-row>
    <div class="step2-text">
      <h5 style="margin-bottom: 10px;">
        Tambah Order
      </h5>
      <p>
        Saatnya mulai masuk-masukin <strong>data order</strong> nih ke Komship. Data yang dimasukin standar aja seperti nama customer, alamat, belinya apa, dikirim dari mana, jumlahnya berapa, COD atau bukan, dll.
      </p>
      <p>Untuk <strong>orderan jenis COD</strong> kamu bisa mempercepat proses input dengan mengaktifkan fitur pendukung <strong>"input cepat"</strong> agar dapat cukup masukin <strong>nilai COD/nilai transaksi</strong> aja.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StepThree',
}
</script>

<style lang="css" src="vuetify/dist/vuetify.min.css" scoped />
