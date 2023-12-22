/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-03 15:44:19
 * @LastEditTime: 2023-12-22 09:43:48
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\utils\reg.ts
 */

const phoneReg = /^1\d{10}$/;
const secretReg = /^(?![a-zA-Z]+$)(?!\d+$)(?![^\da-zA-Z\s]+$).{8,16}$/;

export const verifyPhone = (phone: string) => {
  const str = phone ?? '';
  return phoneReg.test(str);
};

export const getPasswordLevel = (password: string) => {
  let Modes = 0;
  for (let i = 0; i < password.length; i++) {
    Modes |= CharMode(password.charCodeAt(i));
  }
  return bitTotal(Modes);

  //CharMode函数
  function CharMode(iN: number) {
    if (iN >= 48 && iN <= 57)
      //数字
      return 1;
    if (iN >= 65 && iN <= 90)
      //大写字母
      return 2;
    if ((iN >= 97 && iN <= 122) || (iN >= 65 && iN <= 90))
      //大小写
      return 4;
    else return 8; //特殊字符
  }

  //bitTotal函数
  function bitTotal(value: number) {
    let num = value;
    let result = 0;
    for (let i = 0; i < 4; i++) {
      if (num & 1) result++;
      num >>>= 1;
    }
    return result;
  }
};

export const verifyPassword = (password: string) => {
  const str = password ?? '';
  return secretReg.test(str);
};
