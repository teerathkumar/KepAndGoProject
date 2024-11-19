<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\SessionsController;
use App\Http\Controllers\InfoUserController;
use App\Http\Controllers\LeadsController;
use App\Http\Controllers\OfficesController;
use App\Http\Controllers\CustomersController;
use App\Http\Controllers\ServicesController;
use App\Http\Controllers\TicketsController;
use App\Http\Controllers\DocumentsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::resource('posts', PostController::class)->middleware(['auth', 'verified']);
Route::resource('leads', LeadsController::class)->middleware(['auth', 'verified']);
Route::resource('profiles', ProfileController::class)->middleware(['auth', 'verified']);
Route::resource('offices', OfficesController::class)->middleware(['auth', 'verified']);
Route::resource('customers', CustomersController::class)->middleware(['auth', 'verified']);
Route::resource('services', ServicesController::class)->middleware(['auth', 'verified']);
Route::resource('tickets', TicketsController::class)->middleware(['auth', 'verified']);
Route::resource('users', InfoUserController::class)->middleware(['auth', 'verified']);
//Route::resource('documents', DocumentsController::class)->middleware(['auth', 'verified']);
//
//Route::prefix("/offices")->middleware(['auth', 'verified'])->group(function () {
//    Route::get('/', [OfficesController::class, 'index'])->name('offices.index');
//    Route::get('/create', [OfficesController::class, 'create'])->name('offices.create');
//    Route::post('/store', [OfficesController::class, 'store'])->name('offices.store');
//    Route::get('/edit/{id}', [OfficesController::class, 'edit'])->name('offices.edit');
//    Route::put('/update', [OfficesController::class, 'update'])->name('offices.update');
//    Route::delete('/delete', [OfficesController::class, 'destroy'])->name('offices.delete');
//});

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [\App\Http\Controllers\HomeController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::group(['middleware' => ['role:super-admin|admin']], function() {
    Route::resource('permissions', App\Http\Controllers\PermissionController::class);
    Route::get('permissions/{permissionId}/delete', [App\Http\Controllers\PermissionController::class, 'destroy']);

    Route::resource('roles', App\Http\Controllers\RoleController::class);
    Route::get('roles/{roleId}/delete', [App\Http\Controllers\RoleController::class, 'destroy']);
    Route::get('roles/{roleId}/give-permissions', [App\Http\Controllers\RoleController::class, 'addPermissionToRole']);
    Route::put('roles/{roleId}/give-permissions', [App\Http\Controllers\RoleController::class, 'givePermissionToRole']);
    Route::put('users/{userId}/update-status', [App\Http\Controllers\InfoUserController::class, 'updateStatus'])->name('users.updateStatus');
});

Route::group(['middleware' => 'auth'], function () {




    Route::get('/', function () {
        return Inertia::render('Dashboard');
    });

    Route::get('documents/{id}', [DocumentsController::class, 'gallery'])->name('documents.gallery');
    Route::get('documents/gallery/files/{id}', [DocumentsController::class, 'files'])->name('documents.gallery.files');
    Route::get('documents/gallery/files/create/{id}', [DocumentsController::class, 'createfile'])->name('documents.gallery.files.create');
    Route::get('documents/getfiles/{id}', [DocumentsController::class, 'getfiles'])->name('documents.getfiles');
    Route::get('documents/create/{id}', [DocumentsController::class, 'create'])->name('documents.create');
    Route::post('documents/createfile', [DocumentsController::class, 'createfile'])->name('documents.createfile');
    Route::post('documents/store', [DocumentsController::class, 'store'])->name('documents.store');
    Route::get('documents/download/{id}', [DocumentsController::class, 'downloadfile'])->name('documents.download');
    Route::get('documents/search/{id}/{keyword?}', [DocumentsController::class, 'search'])->name('documents.search');
    Route::get('customers/search/{keyword?}', [CustomersController::class, 'search'])->name('customers.search');
    Route::get('tickets/chat/{id}', [TicketsController::class, 'chat'])->name('tickets.chat');

    Route::get('/logout', [SessionsController::class, 'destroy']);
    Route::get('/user-profile', [InfoUserController::class, 'create']);
    Route::post('/user-profile', [InfoUserController::class, 'store']);
    Route::get('/login', function () {
        return view('dashboard');
    })->name('sign-up');
});



Route::group(['middleware' => 'guest'], function () {
    Route::get('/register', [RegisterController::class, 'create']);
    Route::post('/register', [RegisterController::class, 'store']);
    Route::get('/login', [SessionsController::class, 'create']);
    Route::post('/session', [SessionsController::class, 'store']);
    Route::get('/login/forgot-password', [ResetController::class, 'create']);
    Route::post('/forgot-password', [ResetController::class, 'sendEmail']);
    Route::get('/reset-password/{token}', [ResetController::class, 'resetPass'])->name('password.reset');
    Route::post('/reset-password', [ChangePasswordController::class, 'changePassword'])->name('password.update');

});

Route::get('/login', function () {
    return view('session/login-session');
})->name('login');
require __DIR__.'/auth.php';
