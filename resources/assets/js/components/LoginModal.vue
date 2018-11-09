<template>
	<div class="modal fade" id="login-modal">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Account Login</h5>
					<button type="button" class="close" data-dismiss="modal">
						<span>&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<form
							method="POST"
							action="/login"
							name="login_form"
							v-on:submit="event.preventDefault();"
							novalidate>
						<div class="form-group">
							<label for="login-modal-email">Email Address</label>
							<input
									type="email"
									id="login-modal-email"
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
							<label for="login-modal-password">Password</label>
							<input
									type="password"
									id="login-modal-password"
									class="form-control"
									name="password"
									v-bind:value="password"
									required />
							<div class="text-danger" v-if="false">
								This field is required
							</div>
						</div>
						<div class="modal-footer">
							<input type="submit" class="btn btn-outline-success" value="Login" />
						</div>
					</form>
					<div class="alert alert-success" v-if="success">
						<h4 class="alert-heading">Success!</h4>Logging you in now...
					</div>
					<div class="alert alert-danger" v-if="!success && false">
						<h4 class="alert-heading">Login Failed!</h4>
						Your email and/or password could not be verified.
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
				success: false
			};
		}
	}
</script>