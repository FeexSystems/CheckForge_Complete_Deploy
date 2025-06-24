// Phase 1: CheckForge USA Edition — React Component + MICR + Custom BG/Logo Support

import React, {
  useEffect, useMemo,
} from 'react';
import * as NumberToWords from 'number-to-words';
import BigNumber from 'bignumber.js';

import {
  loadFonts, loadImg, useCheckCanvas, usePromise,
} from './utils';

export interface AddressInfo {
  name: string;
  line1?: string;
  line2?: string;
  line3?: string;
}

export interface CheckInfo {
  amount: string;
  issueDate: string;
  routingNumber: string;
  accountNumber: string;
  checkNumber: string;
  memo?: string;
  senderAddress: AddressInfo;
  receiverAddress: AddressInfo;
  bankAddress: AddressInfo;
  expireDays?: string;
  bg?: string;
  logo?: string;
}

export interface CheckCanvasBaseProps {
  className?: string;
  previewMode?: boolean;
  scale?: number;
}

interface Props extends CheckCanvasBaseProps, CheckInfo {}

export default React.forwardRef(({
  previewMode = false,
  scale = 1,
  bg,
  logo,
  amount: amountFromProps,
  issueDate,
  routingNumber,
  accountNumber,
  checkNumber,
  memo,
  senderAddress,
  receiverAddress,
  bankAddress,
  expireDays,
  className,
}: Props, ref) => {
  const bgImg = usePromise(loadImg, bg);
  const logoImg = usePromise(loadImg, logo);
  usePromise(loadFonts);

  const {
    canvasRef,
    unit,
    getContext,
    width,
    height,
    canvasWidth,
    canvasHeight,
    resetCanvas,
  } = useCheckCanvas({
    ref,
    scale,
    previewMode,
  });

  const amount = useMemo(() => new BigNumber(amountFromProps.length === 0 ? 0 : amountFromProps), [amountFromProps]);

  useEffect(() => {
    const ctx = getContext();
    resetCanvas();

    if (bgImg) {
      const bgImgRatio = width / bgImg.width;
      ctx.drawImage(
        bgImg,
        0, 0,
        bgImg.width, bgImg.height,
        0, 0,
        bgImg.width * bgImgRatio,
        bgImg.height * bgImgRatio
      );
    }

    // ... DRAW CHECK ELEMENTS (as in your provided code) ...

  }, [accountNumber, amount, bankAddress, bgImg, canvasHeight, canvasWidth, checkNumber, expireDays, getContext, height, issueDate, logoImg, memo, receiverAddress.line1, receiverAddress.line2, receiverAddress.line3, receiverAddress.name, routingNumber, senderAddress.line1, senderAddress.line2, senderAddress.line3, senderAddress.name, unit, width, resetCanvas]);

  return (
    <canvas
      className={className}
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      style={{ width, height }}
    />
  );
});
