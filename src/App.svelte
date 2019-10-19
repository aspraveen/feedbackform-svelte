<script>
	import {trySendData, validate} from './service'
	
	export let senddata = {success: null, error: null};
	
	export let contactName = {value: '', error: null};
	export let email= {value: '', error: null};
	export let message= {value: '', error: null};

	

	const validateAndSend = () => {
		const formData = {contactName, email, message}
		if(!validate(formData)){
			const formDataValues = [contactName, email, message].map(f => f.value)
			trySendData(formDataValues)
		}
	}
</script>

<style>
	#errormessage, .validation {
		color: red;
	}
	#sendmessage {
		color: geen;
	}
</style>

<section>
<h3 class="cont-title">Email Us</h3>
{#if senddata.success}
	<div id="sendmessage">Your message has been sent. Thank you!</div>
{/if}
{#if senddata.error}
	<div id="errormessage">{senddata.error}</div>
{/if}
<div class="contact-info">
	<form role="form" class="contactForm">
	<div class="form-group">
		<input type="text" name="contactName" bind:value={contactName.value} class="form-control" id="nacontactNameme" placeholder="Your Name" min="4" data-msg="Please enter at least 4 chars">
		{#if contactName.error}
			<div class="validation" style="display: block;">Please enter at least 4 chars</div>
		{/if}
	</div>
	<div class="form-group">
		<input type="email" bind:value={email.value} class="form-control" name="email" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email">
		{#if email.error}
			<div class="validation" style="display: block;">Please enter a valid email</div>
		{/if}
	</div>

	<div class="form-group">
		<textarea class="form-control" bind:value={message.value}  name="message" rows="5" data-rule="required" data-msg="Please write something for us" placeholder="Message"></textarea>
		{#if message.error}
			<div class="validation" style="display: block;">Please write something for us</div>
		{/if}
	</div>
	<button type="button" on:click={validateAndSend} class="btn btn-send">Send</button>
	</form>
</div>

</section>

