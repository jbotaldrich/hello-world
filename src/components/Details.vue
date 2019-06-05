<template>
	<div class="card" style="width: 18rem">
	<img class="card-img-top" v-bind:src="details.photo">
	<div class="card-body">
    <h5 class="card-title">Name: {{details.name}}</h5>
    <p class="card-subtitle">Age: {{details.age}}</p>
	<p class="card-subtitle">Phone #: {{details.number}}</p>
	<h6 class="card-subtitle mb-2 text-muted">EmployeeId: {{details.id}}</h6>
    <p class="card-text">{{details.bio}}</p>
  </div>
</div>
</template>

<script>


export default {
	props :['details']
}

</script>
