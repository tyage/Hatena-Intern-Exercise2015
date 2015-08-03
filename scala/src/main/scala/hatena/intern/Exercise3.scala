package hatena.intern

case class LogCounter(logs: Iterable[Log]) {
  def countError: Int = {
    logs.filter((log) => {
      log.status.toString.matches("""5\d\d""")
    }).size
  }

  type User = String
  def groupByUser: Map[User, Iterable[Log]] = {
    logs.groupBy(_.user match {
      case Some(user) => user
      case _ => "guest"
    })
  }
}
