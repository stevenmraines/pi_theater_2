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
						v-on:submit.prevent="submit"
						novalidate
					>
						<div class="form-group">
							<label for="login-modal-email">Email Address</label>
							<input
								type="email"
								id="login-modal-email"
								class="form-control"
								name="email"
								placeholder="address@email.com"
								v-model="email"
								required
								autofocus
							/>
							<div class="text-danger" v-if="false">
								Invalid email address
							</div>
							<div class="text-danger" v-if="email === ''">
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
								v-model="password"
								required
							/>
							<div class="text-danger" v-if="password === ''">
								This field is required
							</div>
						</div>
						<div class="modal-footer">
							<input type="submit" class="btn btn-outline-success" value="Login" />
						</div>
					</form>
					<div class="alert alert-success" v-if="loggedIn">
						<h4 class="alert-heading">Success!</h4>Logging you in now...
					</div>
					<div class="alert alert-danger" v-if="notLoggedIn">
						<h4 class="alert-heading">Login Failed!</h4>
						<span>{{ errorMessage }}</span>
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
				email:			'',
				password:		'',
				success:		false,
				submitted:		false,
				errorMessage:	'',
			};
		},
		computed: {
			loggedIn() {
				return this.success && this.submitted;
			},
			notLoggedIn() {
				return !this.success && this.submitted;
			}
		},
		methods: {
			submit() {
				var self	= this;
				var creds	= {
					email:		this.email,
					password:	this.password
				};

				axios
					.post('/login', creds)
					.then(function(response) {
						self.submitted = true;

						if(response.data.success) {
							self.success = true;

							setTimeout(function() {
								window.location.reload(false);
							}, 1000);
						}

						self.errorMessage = 'Your email and/or password could not be verified.';
					})
					.catch(function(error) {
						self.submitted		= true;
						self.success		= false;
						self.errorMessage	= 'An unknown error occurred';
					});
			}
		}
	}
</script>
