const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className="flex items-center w-full gap-4">
      {/* Progress track */}
      <div className="flex-1 h-1 bg-gray-300 rounded-full overflow-hidden">
        <div
          style={{ width: `${progress === 0 ? 1 : progress}%` }}
          className="h-full bg-primary rounded-full transition-all duration-300"
        />
      </div>

      {/* Percentage */}
      <span className="text-primary font-medium min-w-10 text-right">
        {progress}%
      </span>
    </div>
  );
};

export default ProgressBar;
