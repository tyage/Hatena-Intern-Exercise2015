package hatena.intern

import java.io.File
import java.nio.file.{ Paths, Files }

import scala.io.Source

class LtsvFileNotFoundExcepion(message: String = null) extends RuntimeException(message)

class InvalidLtsvException(message: String = null) extends RuntimeException(message)

object LtsvParser {
  def parse(filePath: String): Iterable[Log] = {
    if (Files.exists(Paths.get(filePath))) {
      val source = Source.fromFile(filePath)
      source.getLines().map(parseLine).toList
    } else {
      throw new LtsvFileNotFoundExcepion(s"${filePath} is not found")
    }
  }
  def parseLine(ltsv: String): Log = {
    val ltsvMap = ltsv.split("\t").foldLeft(Map.empty[String, String])((map, lv) => {
      val Array(label, value) = splitOnce(lv, ":")
      map + (label -> value)
    })
    Log(
      host = getLtsvValue(ltsvMap, "host"),
      user = getLtsvValueOrNone(ltsvMap, "user"),
      epoch = getLtsvValue(ltsvMap, "status").toInt,
      req = getLtsvValue(ltsvMap, "req"),
      status = getLtsvValue(ltsvMap, "status").toInt,
      size = getLtsvValue(ltsvMap, "size").toInt,
      referer = getLtsvValueOrNone(ltsvMap, "referer")
    )
  }

  private def getLtsvValue(ltsvMap: Map[String, String], name: String): String = {
    ltsvMap.get(name) match {
      case Some(value) => value
      /* XXX: Error should be occured */
      case None => ""
    }
  }
  private def getLtsvValueOrNone(ltsvMap: Map[String, String], name: String): Option[String] = {
    ltsvMap.get(name) match {
      case Some(value) =>
        value match {
          case "-" => None
          case _ => Some(getLtsvValue(ltsvMap, name))
        }
      /* XXX: Error should be occured */
      case None => Some("")
    }
  }
  private def splitOnce(str: String, delimiter: String): Array[String] = {
    val splited = str.split(delimiter)
    if (splited.size <= 1) {
      throw new InvalidLtsvException("delimiter of label and value is not found")
    }
    Array(splited.head, splited.tail.mkString(""))
  }
}
