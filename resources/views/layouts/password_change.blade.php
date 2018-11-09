<div class="modal fade" id="change_password_modal" ng-controller="user">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Change Password</h5>
				<button type="button" class="close" data-dismiss="modal">
					<span>&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<form name="change_password_form" ng-submit="change_credentials(change_password_form)" novalidate>
					<div class="form-group">
						<label for="change-password-modal-email">Email Address</label>
						<input type="email" class="form-control" id="change-password-modal-email" placeholder="address@email.com" name="email" ng-model="change_password.email" required />
						<div class="text-danger" ng-show="change_password_form.email.$dirty && change_password_form.email.$invalid && !change_password_form.email.$error.required">
							Invalid email address
						</div>
						<div class="text-danger" ng-show="change_password_form.email.$error.required">
							This field is required
						</div>
					</div>
					<div class="form-group">
						<label for="change-password-modal-password">Current Password</label>
						<input type="password" class="form-control" id="change-password-modal-password" name="password" ng-model="change_password.password" required />
						<div class="text-danger" ng-show="change_password_form.password.$error.required">
							This field is required
						</div>
					</div>
					<div class="form-group">
						<label for="change-password-modal-new-password">New Password</label>
						<input type="password" class="form-control" id="change-password-modal-new-password" name="new_password" ng-model="change_password.new_password" required />
						<div class="text-danger" ng-show="change_password_form.new_password.$error.required">
							This field is required
						</div>
					</div>
					<div class="modal-footer">
						<input type="submit" class="btn btn-outline-success" value="Change" />
					</div>
				</form>
				<div class="alert alert-success" ng-show="change_password.success">
					<h4 class="alert-heading">Thank you!</h4>
					Your password has been changed.
				</div>
				<div class="alert alert-danger" ng-show="change_password.failure">
					<h4 class="alert-heading">Password Change Failed!</h4>
					Please check your credentials and try again.
				</div>
			</div>
		</div>
	</div>
</div>