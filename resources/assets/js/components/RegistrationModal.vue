<template>
	<div class="modal fade" id="register-modal">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Account Registration</h5>
					<button type="button" class="close" data-dismiss="modal">
						<span>&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<form
							method="POST"
							action="/register"
							name="register_form"
							v-on:submit="event.preventDefault();"
							novalidate>
						<div class="form-group">
							<label for="register-modal-email">Email Address</label>
							<input
									type="email"
									id="register-modal-email"
									class="form-control"
									name="email"
									placeholder="address@email.com"
									v-bind:value="email"
									required />
							<div class="text-danger" v-if="false">
								Invalid email address
							</div>
							<div class="text-danger" v-if="false">
								This field is required
							</div>
						</div>
						<div class="form-group">
							<label for="register-modal-password">Password</label>
							<input
									type="password"
									id="register-modal-password"
									class="form-control"
									name="password"
									v-bind:value="password"
									required />
							<div class="text-danger" v-if="false">
								This field is required
							</div>
						</div>
						<div class="modal-footer">
							<input type="submit" class="btn btn-outline-success" value="Register" />
						</div>
					</form>
					<div class="alert alert-success" v-if="success">
						<h4 class="alert-heading">Thank you!</h4>
						You have successfully registered! Logging you in now...
					</div>
					<div class="alert alert-danger" v-if="!success && false">
						<h4 class="alert-heading">Registration Failed!</h4>
						A user with this email address may already be registered.
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				email: '',
				password: '',
				remember: false,
				success: false
			};
		}
	}
</script>