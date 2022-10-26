export const maxTagPlaceholder: any = (res: any = [], showName = 'label', titleLineNumber = 3) => {
  let lengths = res.length;
  return (
    <span
      title={res
        .map((item: any, index: number) => {
          // &#10;
          let canshu = item[showName];
          if (index !== lengths - 1) {
            if ((index + 1) % titleLineNumber === 0) {
              canshu += `,
`; //这里特意留的换行符 不要格式化！ 一定要在本行的最开始!
            } else {
              canshu += ',';
            }
          }
          return canshu;
        })
        .join('')}
    >
      <span>+</span>
      <span style={{ margin: '0 5px' }}>{res.length}</span>
      <span>...</span>
    </span>
  );
};
