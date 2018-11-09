<div class="modal fade" id="change_email_modal" ng-controller="user">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Change Email</h5>
				<button type="button" class="close" data-dismiss="modal">
					<span>&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<form name="change_email_form" ng-submit="change_credentials(change_email_form)" novalidate>
					<div class="form-group">
						<label for="change-email-modal-email">Current Email Address</label>
						<input type="email" class="form-control" id="change-email-modal-email" placeholder="address@email.com" name="email" ng-model="change_email.email" required />
						<div class="text-danger" ng-show="change_email_form.email.$dirty && change_email_form.email.$invalid && !change_email_form.email.$error.required">
							Invalid email address
						</div>
						<div class="text-danger" ng-show="change_email_form.email.$error.required">
							This field is required
						</div>
					</div>
					<div class="form-group">
						<label for="change-email-modal-password">Password</label>
						<input type="password" class="form-control" id="change-email-modal-password" name="password" ng-model="change_email.password" required />
						<div class="text-danger" ng-show="change_email_form.password.$error.required">
							This field is required
						</div>
					</div>
					<div class="form-group">
						<label for="change-email-modal-new-email">New Email Address</label>
						<input type="email" class="form-control" id="change-email-modal-new-email" placeholder="address@email.com" name="new_email" ng-model="change_email.new_email" required />
						<div class="text-danger" ng-show="change_email_form.new_email.$dirty && change_email_form.new_email.$invalid && !change_email_form.new_email.$error.required">
							Invalid email address
						</div>
						<div class="text-danger" ng-show="change_email_form.new_email.$error.required">
							This field is required
						</div>
					</div>
					<div class="modal-footer">
						<input type="submit" class="btn btn-outline-success" value="Change" />
					</div>
				</form>
				<div class="alert alert-success" ng-show="change_email.success">
					<h4 class="alert-heading">Thank you!</h4>
					Your email address has been changed.
				</div>
				<div class="alert alert-danger" ng-show="change_email.failure">
					<h4 class="alert-heading">Email Change Failed!</h4>
					Please check your credentials and try again.
				</div>
			</div>
		</div>
	</div>
</div>