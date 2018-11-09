<?php
use Illuminate\Support\Facades\Auth;
$user = Auth::check();
?>

@if($user)
<h1>Sup</h1>
@else
<h1>Get outta here, ya jabroni</h1>
@endif