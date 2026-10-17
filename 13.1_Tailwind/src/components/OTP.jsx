import { useRef, useState } from "react";

export const Otp = () => {
  const otpLength = 6;

  const [otp, setOtp] = useState(
    Array.from({ length: otpLength }, () => "")
  );

  const [status, setStatus] = useState("idle");

  const isComplete = otp.every((digit) => digit !== "");
  const finalOtp = otp.join("");

  const handleVerify = async () => {
    if (!isComplete || status === "loading") {
      return;
    }

    try {
      setStatus("loading");

      console.log("Sending OTP:", finalOtp);

      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });

      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div>
      <OtpInput
        value={otp}
        onChange={setOtp}
        length={otpLength}
      />

      <button
        disabled={!isComplete || status === "loading"}
        onClick={handleVerify}
        className="mt-4 rounded-lg bg-black px-5 py-2 text-white disabled:opacity-40"
      >
        {status === "loading" ? "Verifying..." : "Verify"}
      </button>

      {status === "success" && (
        <p className="mt-2 text-green-600">
          OTP verified successfully.
        </p>
      )}

      {status === "error" && (
        <p className="mt-2 text-red-600">
          Invalid OTP.
        </p>
      )}
    </div>
  );
};

function OtpInput({ value, onChange, length }) {
  const inputRefs = useRef([]);

  const handleChange = (index, newValue) => {
    if (newValue !== "" && !/^\d$/.test(newValue)) {
      return;
    }

    const newOtp = [...value];

    newOtp[index] = newValue;

    onChange(newOtp);

    if (newValue !== "") {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && value[index] === "") {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowLeft") {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight") {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (index, e) => {
    e.preventDefault();

    const pastedValue = e.clipboardData.getData("text");

    if (!/^\d+$/.test(pastedValue)) {
      return;
    }

    const digits = pastedValue
      .slice(0, length - index)
      .split("");

    const newOtp = [...value];

    digits.forEach((digit, i) => {
      newOtp[index + i] = digit;
    });

    onChange(newOtp);

    const nextIndex = Math.min(
      index + digits.length,
      length - 1
    );

    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="flex">
      {value.map((digit, index) => {
        return (
          <input
            key={index}
            ref={(element) => {
              inputRefs.current[index] = element;
            }}
            type="text"
            value={digit}
            maxLength={1}
            inputMode="numeric"
            onChange={(e) => {
              handleChange(index, e.target.value);
            }}
            onKeyDown={(e) => {
              handleKeyDown(index, e);
            }}
            onPaste={(e) => {
              handlePaste(index, e);
            }}
            className="m-1 h-12.5 w-10 rounded-xl bg-blue-500 text-center text-white outline-none"
          />
        );
      })}
    </div>
  );
}