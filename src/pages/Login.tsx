import Button from "@/components/button";
import LogoText from "@/assets/logos/logo_text";
import InputField from "@/components/signup/input-field";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isEmailError = useMemo(() => {
    if (email.length === 0) return true;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !re.test(email);
  }, [email]);
  const isPasswordError = useMemo(() => {
    if (password.length === 0) return true;
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,16}$/;
    return !re.test(password);
  }, [password]);

  const onFormChange = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as HTMLElement;
    if (!(target instanceof HTMLInputElement)) return;
    const { id, value } = target;
    if (id === "email") setEmail(value);
    else if (id === "password") setPassword(value);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-[194px] px-[380px]">
      <div className="w-full flex flex-col items-center justify-center py-[80px] px-[80px] gap-[24px] bg-opacity-500 rounded-2xl">
        {/* 상단 영역 */}
        <div className="flex flex-col items-center justify-center gap-[8px]">
          <LogoText width={213} height={60} />
          <div className="text-body3 text-primary-900">
            계속하려면 로그인 하세요.
          </div>
        </div>
        {/* 폼 영역 */}
        <form
          className="flex flex-col items-center justify-center gap-[16px] w-full"
          onChange={onFormChange}
        >
          <InputField
            label="아이디(이메일)"
            type="email"
            placeholder="이메일 주소"
            description="이메일 주소를 입력하세요."
            error={isEmailError}
            id="email"
          />
          <InputField
            label="비밀번호"
            type="password"
            placeholder="비밀번호"
            description="비밀번호는 8자리 이상입니다."
            error={isPasswordError}
            id="password"
          />
          <Button
            variant="filled"
            size="large"
            fullWidth
            disabled={isEmailError || isPasswordError}
          >
            로그인
          </Button>
        </form>
        {/* 라인 */}
        <div className="w-full h-[1px] bg-[#DDE1E6]" />
        {/* 하단 영역 */}
        <div className="w-full text-center text-body5 text-gray-900">
          아직 계정이 없으신가요?{" "}
          <a
            onClick={() => navigate("/signup")}
            className="text-primary-700 underline cursor-pointer"
          >
            회원가입
          </a>
        </div>
      </div>
    </div>
  );
}
