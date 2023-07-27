import { useAuth } from "@/context/authCtx";

const LoginForm = () => {
  const { login, loading, error } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    login(username, password);
  };

  return (
    <section className="h-screen">
      <form
        className="flex flex-col px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-grey-darker"
            htmlFor="username"
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
            htmlFor="password"
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
            className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-blue-dark disabled:bg-green-200"
            type="submit"
            disabled={loading}
          >
            Sign In
          </button>
        </div>
        {error && <p className="text-center text-red-500">{error}</p>}
      </form>
    </section>
  );
};
export default LoginForm;
