package hatena.intern

/**
 * Created by tyage on 2015/08/03.
 */

/*
ユーザーごとのステータス分布をダイアグラムとして出力します

scala> (new LtsvViewer).fromFile("../sample_data/large_log.ltsv")
frank
---:          112
500:=======*
404:==========*
200:========*

guest
---:          80
302:==*
503:==========*

john
---:          80
404:==*
200:==========*

 */
class LtsvViewer {
  def fromFile(filename: String): Unit = {
    val logs = LtsvParser.parse(filename);
    LogCounter(logs).groupByUser.foreach((map) => {
      printStatusGraph(map)
      println("")
    })
  }

  private def printStatusGraph(map: (LogCounter#User, Iterable[Log])): Unit = {
    val (user, logs) = map
    val countList = logs.groupBy(_.status.toString).foldLeft(Map.empty[String, Int])((map, group) => {
      val (status, logs) = group
      map ++ Map(status -> logs.size)
    })

    println(user)
    printDiagram(countList)
  }
  private def printDiagram(list: Map[String, Int]) = {
    val graphWidth = 10
    val maxLabelLength = list.keys.maxBy(_.size).size
    val maxValue = list.values.max

    println(s"${"-" * maxLabelLength}:${" " * graphWidth}${maxValue}")
    list.foreach((data) => {
      val (label, value) = data
      val graphLength = graphWidth * value / maxValue
      println(s"${label}${" " * (maxLabelLength - label.size)}:${"=" * graphLength}*")
    })
  }
}
