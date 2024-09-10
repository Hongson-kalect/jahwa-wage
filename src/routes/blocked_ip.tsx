export const SpamAlert = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-8">
      <div className="max-w-md rounded-lg bg-white p-6 text-center shadow-lg">
        <h1 className="mb-4 text-4xl font-extrabold text-gray-800">
          Hmm... không thể truy cập trang này
        </h1>
        <p className="mb-4 text-lg text-gray-600">
          Địa chỉ IP của bạn đã bị chặn do xì pam clmm.
        </p>
        <p className="text-5xl font-bold text-red-600">Mày Cook</p>
      </div>
    </div>
  );
};
