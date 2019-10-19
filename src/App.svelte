<script>
	import {trySendData, validate} from './service'

	export let STATE = {
		send: {
			success: null, 
			error: null,
			isSent: false
		},
		validationErrors: {}
	}

	const validateAndSend = () => {
		STATE.validationErrors = {}
		const formData = new FormData(document.forms.feedbackForm)
		const validationResult = validate(formData)
		if(validationResult.isValid){
			 trySendData(formData).then(data => {
				STATE.send = data;
				STATE.isSent = data.success;
			})
		} else {
			validationResult.errors.forEach(error => {
				STATE.validationErrors[error] = true
			})
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
	<!-- {@debug STATE} -->
	<h3 class="cont-title">Email Us</h3>
	{#if STATE.send.success}
		<div id="sendmessage">Your message has been sent. Thank you!</div>
	{/if}
	{#if STATE.send.error}
		<div id="errormessage">{STATE.send.error} <br> Please try again</div>
	{/if}
	{#if !STATE.send.isSents}
		<div class="contact-info">
			<form role="form" name="feedbackForm" class="contactForm">
			<div class="form-group">
				<input type="text" name="contactName" class="form-control" id="nacontactNameme" placeholder="Your Name" min="4" data-msg="Please enter at least 4 chars">
				{#if STATE.validationErrors.contactName}
					<div class="validation" style="display: block;">Please enter at least 4 chars</div>
				{/if}
			</div>
			<div class="form-group">
				<input type="email" class="form-control" name="email" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email">
				{#if STATE.validationErrors.email}
					<div class="validation" style="display: block;">Please enter a valid email</div>
				{/if}
			</div>

			<div class="form-group">
				<textarea class="form-control" name="message" rows="5" data-rule="required" data-msg="Please write something for us" placeholder="Message"></textarea>
				{#if STATE.validationErrors.message}
					<div class="validation" style="display: block;">Please write something for us</div>
				{/if}
			</div>
			<button type="button" on:click={validateAndSend} class="btn btn-send">Send</button>
			</form>
		</div>
	{/if}
</section>

