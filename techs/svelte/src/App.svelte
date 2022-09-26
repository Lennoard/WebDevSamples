<script>
  import BmiForm from "./components/BmiForm.svelte";
  import Footer from "./components/Footer.svelte";
  import Header from "./components/Header.svelte";
</script>

<div id="container">
  <Header title="BMI Calculator" />

  <main>
    <h2>Type your data</h2>
    <BmiForm />
  </main>

  <Footer title="&copy; R1 Software &commat; 2023" />
</div>
