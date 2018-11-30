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
						v-on:submit.prevent="submit()"
						novalidate
					>
						<div class="form-group">
							<label for="register-modal-name">Name</label>
							<input
								id="register-modal-name"
								class="form-control"
								name="name"
								placeholder="John"
								v-model="name"
								autofocus
								required
							/>
							<div class="text-danger" v-if="false">
								Invalid email address
							</div>
							<div class="text-danger" v-if="name === ''">
								This field is required
							</div>
						</div>
						<div class="form-group">
							<label for="register-modal-email">Email</label>
							<input
								type="email"
								id="register-modal-email"
								class="form-control"
								name="email"
								placeholder="address@email.com"
								v-model="email"
								required
							/>
							<div class="text-danger" v-if="false">
								Invalid email address
							</div>
							<div class="text-danger" v-if="email === ''">
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
								v-model="password"
								required
							/>
							<div class="text-danger" v-if="password === ''">
								This field is required
							</div>
						</div>
						<div class="form-group">
							<label for="register-modal-password-conf">Confirm Password</label>
							<input
								type="password"
								id="register-modal-password-conf"
								class="form-control"
								name="password_confirmation"
								v-model="password_confirmation"
								required
							/>
							<div class="text-danger" v-if="password_confirmation === ''">
								This field is required
							</div>
						</div>
						<div class="modal-footer">
							<input type="submit" class="btn btn-outline-success" value="Register" />
						</div>
					</form>
					<div class="alert alert-success" v-if="registered">
						<h4 class="alert-heading">Thank you!</h4>
						You have successfully registered! Logging you in now...
					</div>
					<div class="alert alert-danger" v-if="notRegistered">
						<h4 class="alert-heading">Registration Failed!</h4>
						<span>{{ errorMessage }}</span>
						<ul v-if="errors.name || errors.email || errors.password">
							<li v-for="error in errors.name">{{ error }}</li>
							<li v-for="error in errors.email">{{ error }}</li>
							<li v-for="error in errors.password">{{ error }}</li>
						</ul>
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
				name:					'',
				email:					'',
				password:				'',
				password_confirmation:	'',
				success:				false,
				submitted:				false,
				errorMessage:			'',
				errors:					{},
			};
		},
		computed: {
			registered() {
				return this.success && this.submitted;
			},
			notRegistered() {
				return !this.success && this.submitted;
			}
		},
		methods: {
			submit: function() {
				var self	= this;
				var creds	= {
					name:					this.name,
					email:					this.email,
					password:				this.password,
					password_confirmation:	this.password_confirmation,
				};

				axios
					.post('/register', creds)
					.then(function(response) {
						self.submitted = true;

						if(response.data.success) {
							self.success = true;

							setTimeout(function() {
								window.location.reload(false);
							}, 1000);
						}

						if(!response.data.success) {  // Need to clean this up
							self.errorMessage = response.data.message;
						}
					})
					.catch(function(error) {
						self.submitted		= true;
						self.success		= false;
						self.errors			= {};
						self.errorMessage	= 'An unknown error occurred';

						if(error.response) {
							if(error.response.data.message) {
								self.errorMessage = error.response.data.message;
							}

							if(error.response.data.errors) {
								self.errors = error.response.data.errors;
							}
						}else if(error.request) {
							console.log(error.request);
						}else {
							console.log(error.message);
						}
					});
			}
		}
	}
</script>
