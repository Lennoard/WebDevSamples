<script>
  import FormInput from "./FormInput.svelte";

  let nameValue = "";
  let weightValue = 0.0;
  let heightValue = 0.0;

  const onSubmit = (e) => {
    const formData = new FormData(e.target);

    const data = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }
    
    calculate(data);
  }

  const calculate = (data) => {
    const h = parseFloat(data.Height);
    const bmi = (parseFloat(data.Weight)) / (h * h);

    alert(`BMI de ${data.Name}: ${bmi.toFixed(2)}`);
  };
</script>

<form on:submit|preventDefault={onSubmit}>
  <FormInput name="Name" type="text" value={nameValue} />
  <FormInput name="Weight" type="number" value={weightValue} />
  <FormInput name="Height" type="number" value={heightValue} step="0.01" />

  <button type="submit">Calculate</button>
</form>
