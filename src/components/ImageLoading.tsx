
const ImageLoading = ({ style, dimensions }: { style?: React.CSSProperties | undefined; dimensions: { height: string, width: string }  }) => {
  const imageSpinnerClass = 'rounded-full box-border absolute w-full h-full border-transparent border-solid border-8'

  return (
    <div className=" w-full h-full flex justify-center items-center flex-shrink-0 flex-grow-0 object-scale-down imageEffect select-none" style={style}>
      <div style={dimensions} className="relative w-1/2rounded-full animate-spin">
        <div className={`${imageSpinnerClass } border-t-orange-500 dark:border-t-slate-900`}></div>
        <div className={`${imageSpinnerClass} bottom-0  border-b-orange-500 dark:border-b-slate-900`}></div>
      </div>
    </div>
  )
}

export default ImageLoading