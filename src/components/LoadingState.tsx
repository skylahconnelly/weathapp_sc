/**
 * Displays a loading indicator
 */

/*export function LoadingState() {
  return (
    <div className="flex justify-center">
      <div className="text-zinc-600 dark:text-zinc-400">
        Loading weather data...
      </div>
    </div>
  );
}*/

//CODE GENERATED WITH THE HELP OF CHATGPT AI TOOL.
export function LoadingState() {
  return (
    <div className="flex items-center justify-center gap-2">
      <svg
        className="w-5 h-5 animate-spin text-zinc-600 dark:text-zinc-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      <span className="text-zinc-600 dark:text-zinc-400">
        Loading weather data...
      </span>
    </div>
  );
}
