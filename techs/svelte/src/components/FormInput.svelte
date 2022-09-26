<script>
  export let name;
  export let value;
  export let step = ".1";
  export let type = "text";

  function typeAction(node) {
    node.type = type;
  }
</script>

<div class="input-control">
  <label for={name}>{name}: </label>
  <input {name} autoComplete="off" use:typeAction bind:value {step} />
</div>
