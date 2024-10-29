import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import {Head, Link, useForm} from '@inertiajs/react';

export default function Login({status, canResetPassword}) {
    const {data, setData, post, processing, errors, reset} = useForm({
        email: 'test@example.com',
        password: 'password',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
            <Head title="Log in"/>


            <main className="main-content  mt-0">

                <section>
                    <div className="page-header min-vh-75">
                        <div className="container">
                            <div className="row">

                                <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                                    <div className="card card-plain mt-8">
                                        <div className="card-header pb-0 text-left bg-transparent">
                                            <h3 className="font-weight-bolder text-info text-gradient">Welcome back</h3>
                                            <p className="mb-0">Create a new acount<br/></p>
                                            <p className="mb-0">OR Sign in with these credentials:</p>
                                            <p className="mb-0">Email <b>test@example.com</b></p>
                                            <p className="mb-0">Password <b>password</b></p>
                                        </div>
                                        <div className="card-body">
                                            <form onSubmit={submit}>
                                                <div>
                                                    <InputLabel htmlFor="email" value="Email"/>

                                                    <TextInput
                                                        id="email"
                                                        type="email"
                                                        name="email"
                                                        value={data.email}
                                                        className="mt-1 block w-full"
                                                        autoComplete="username"
                                                        isFocused={true}
                                                        onChange={(e) => setData('email', e.target.value)}
                                                    />

                                                    <InputError message={errors.email} className="mt-2"/>
                                                </div>

                                                <div className="mt-4">
                                                    <InputLabel htmlFor="password" value="Password"/>

                                                    <TextInput
                                                        id="password"
                                                        type="password"
                                                        name="password"
                                                        value={data.password}
                                                        className="mt-1 block w-full"
                                                        autoComplete="current-password"
                                                        onChange={(e) => setData('password', e.target.value)}
                                                    />

                                                    <InputError message={errors.password} className="mt-2"/>
                                                </div>

                                                <div className="mt-4 block">
                                                    <label className="flex items-center">
                                                        <Checkbox
                                                            name="remember"
                                                            checked={data.remember}
                                                            onChange={(e) =>
                                                                setData('remember', e.target.checked)
                                                            }
                                                        />
                                                        <span className="ms-2 text-sm text-gray-600">
                            Remember me
                        </span>
                                                    </label>
                                                </div>

                                                <div className="mt-4 flex items-center justify-end">
                                                    {canResetPassword && (
                                                        <Link
                                                            href={route('password.request')}
                                                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                        >
                                                            Forgot your password?
                                                        </Link>
                                                    )}

                                                    <PrimaryButton className="ms-4" disabled={processing}>
                                                        Log in
                                                    </PrimaryButton>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="card-footer text-center pt-0 px-lg-2 px-1">
                                            <small className="text-muted">Forgot you password? Reset you password
                                                <a href="/login/forgot-password"
                                                   className="text-info text-gradient font-weight-bold">here</a>
                                            </small>
                                            <p className="mb-4 text-sm mx-auto">
                                                Don't have an account?
                                                <a href="register" className="text-info text-gradient font-weight-bold">Sign
                                                    up</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="oblique position-absolute top-0 h-100 d-md-block d-none me-n8">
                                        <div
                                            className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
                                            style={{backgroundImage: "url('../assets/img/curved-images/curved6.jpg')"}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </GuestLayout>
    );
}
