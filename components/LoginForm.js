const LoginForm = () => {
  return (
    <section className="h-screen">
      <div className="flex flex-col px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-grey-darker"
            for="username"
          >
            Username
          </label>
          <input
            className="w-full px-3 py-2 border rounded shadow appearance-none text-grey-darker"
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="mb-6">
          <label
            className="block mb-2 text-sm font-bold text-grey-darker"
            for="password"
          >
            Password
          </label>
          <input
            className="w-full px-3 py-2 mb-3 border rounded shadow appearance-none border-red text-grey-darker"
            id="password"
            type="password"
            placeholder="password"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-blue-dark"
            type="button"
          >
            Sign In
          </button>
        </div>
      </div>
    </section>
  );
};
export default LoginForm;
