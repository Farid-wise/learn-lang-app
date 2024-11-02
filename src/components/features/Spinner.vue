<script setup lang="ts">

</script>
<template>
	<div :style="{textAlign: 'center'}">
		<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 24 24">
			<circle cx="4" cy="12" r="1.5" fill="#518cec">
				<animate attributeName="r" dur="0.563s" repeatCount="indefinite" values="1.5;3;1.5" />
			</circle>
			<circle cx="12" cy="12" r="3" fill="#518cec">
				<animate attributeName="r" dur="0.563s" repeatCount="indefinite" values="3;1.5;3" />
			</circle>
			<circle cx="20" cy="12" r="1.5" fill="#518cec">
				<animate attributeName="r" dur="0.563s" repeatCount="indefinite" values="1.5;3;1.5" />
			</circle>
		</svg>
	</div>
</template>
