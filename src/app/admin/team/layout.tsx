type Props = {
  children: React.ReactNode;
};

export default function TeamLayout({ children }: Props) {
  // return <IsLeader isLeader={isLeader} setIsLeader={setIsLeader}>{children}</IsLeader>
  return <>{children}</>
}
