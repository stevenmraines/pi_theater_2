
@extends('layouts.master')
@section('content')
    <style>
        html, body {
            height: 100% !important;
        }
    </style>
    <div class="container-fluid h-100">
        <div class="row h-100">
            <h1 class="m-auto text-muted">
                {{ $exception->getMessage() }}
            </h1>
        </div>
    </div>
@endsection
